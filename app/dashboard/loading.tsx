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

import DateFilter from "@/components/date-filter";
import FormDialog from "@/components/form-dialog";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
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
          <div className="mx-auto w-full max-w-3xl flex justify-between items-center py-1">
            <div className="flex gap-4 items-center">
              <h1 className="font-bold text-2xl">Activities</h1>
              <DateFilter month="0" year="0" />
            </div>

            <FormDialog activities={[]} />
          </div>

          <div className="grid grid-cols-3 gap-1">
            <Skeleton className="w-full h-64" />
            <Skeleton />
            <Skeleton />
            <Skeleton className="w-full h-64" />
            <Skeleton />
            <Skeleton />
            <Skeleton className="w-full h-64" />
            <Skeleton />
            <Skeleton />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
