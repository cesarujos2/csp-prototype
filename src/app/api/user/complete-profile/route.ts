import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { ZodError } from 'zod';
import { prisma } from '../../../_config/database';
import { authOptions } from '../../auth/[...nextauth]/route';

import { ProfileCompletionResponse, ProfileCompletionError } from '@/app/complete-profile/_interfaces/profile-completion.interface';
import { ProfileCompletionData, profileCompletionSchema } from '@/app/complete-profile/_validations/profile-validation.schema';


// Use the same auth options from the main NextAuth configuration

export async function POST(request: NextRequest): Promise<NextResponse<ProfileCompletionResponse | ProfileCompletionError>> {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 401 }
      );
    }

    // Parse and validate the request body
    const body = await request.json();
    
    let validatedData: ProfileCompletionData;
    try {
      validatedData = profileCompletionSchema.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string[]> = {};
        error.issues.forEach((err) => {
          const field = err.path.join('.');
          if (!fieldErrors[field]) {
            fieldErrors[field] = [];
          }
          fieldErrors[field].push(err.message);
        });
        
        return NextResponse.json(
          { 
            success: false, 
            message: "Datos de entrada inválidos",
            errors: fieldErrors 
          },
          { status: 400 }
        );
      }
      throw error;
    }

    // Update user profile in database
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        address: validatedData.address,
        postalCode: validatedData.postalCode,
        profileComplete: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Perfil completado exitosamente",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name || "",
        address: updatedUser.address || "",
        postalCode: updatedUser.postalCode || "",
        profileComplete: updatedUser.profileComplete,
      },
    });
  } catch (error) {
    console.error("Error completing profile:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}