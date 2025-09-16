import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { prisma } from '../../../_config/database';
import { authOptions } from '../../auth/[...nextauth]/route';
import { Role } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse the request body
    const { role } = await request.json();

    // Validate the role
    const validRoles: Role[] = ['OWNER', 'ADMIN', 'MONITORING', 'OFFICER', 'USER'];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    // Update the user's role in the database
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        role: role as Role,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: `Role changed to ${role} successfully`,
    });

  } catch (error) {
    console.error('Error changing user role:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}