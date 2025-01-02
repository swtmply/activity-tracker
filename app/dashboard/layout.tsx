import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <SidebarProvider>
      <SidebarLeft />
      <SidebarInset> */}
      <header className="sticky top-0 flex h-14 shrink-0 items-center justify-center gap-2 bg-background">
        <div className="flex flex-1 items-center gap-2 max-w-3xl pl-6 md:pl-0">
          {/* <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" /> */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  Activity Tracking
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      {children}
      {/* </SidebarInset>
    </SidebarProvider> */}
    </>
  );
}
