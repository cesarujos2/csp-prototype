"use client";

import React from 'react';
import { Header } from '@/app/_components/Header';
import { ThemeSwitch } from '@/app/_components/ThemeSwitch';
import { UserDropdown } from './UserDropdown';
import { RoleChanger } from './RoleChanger';

export const DashboardHeader: React.FC = () => {
    return (
        <Header components={[
            <RoleChanger key="role-changer" />,
            <ThemeSwitch key="theme-switch" />,
        ]}>
            <UserDropdown />
        </Header>
    );
};

export default DashboardHeader;
