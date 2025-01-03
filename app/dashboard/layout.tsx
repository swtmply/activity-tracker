import SignOutButton from "@/components/sign-out-button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <header className="sticky top-0 flex h-14 shrink-0 items-center justify-center gap-2 bg-background">
        <div className="flex flex-1 items-center justify-between gap-2 max-w-3xl pl-6 md:pl-0">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <SignOutButton />
        </div>
      </header>
      {children}
    </React.Fragment>
  );
}
