import ActivityCards from "@/components/activity-cards";
import ActivityForm from "@/components/activity-form";
import DataEntryForm from "@/components/data-entry-form";
import { SidebarLeft } from "@/components/sidebar-left";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
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

        <main className="mx-auto w-full max-w-3xl flex flex-col gap-4">
          <div className="mx-auto w-full max-w-3xl flex justify-between items-center">
            <div className="flex gap-1">
              <h1 className="font-bold text-2xl">Activities</h1>
            </div>

            <div className="flex gap-1">
              <ActivityForm />
              <DataEntryForm />
            </div>
          </div>
          <ActivityCards />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
