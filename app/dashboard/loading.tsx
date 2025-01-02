import FormDialog from "@/components/form-dialog";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Loading() {
  return (
    <main className="mx-auto w-full max-w-3xl flex flex-col gap-4">
      <div className="mx-auto w-full max-w-3xl flex justify-between items-center py-1">
        <div className="flex gap-4 items-center">
          <h1 className="font-bold text-2xl">Activities</h1>
        </div>

        <FormDialog activities={[]} />
      </div>

      <div className="grid grid-cols-3 gap-1">
        <Skeleton className="w-full h-56" />
        <Skeleton />
        <Skeleton />
        <Skeleton className="w-full h-56" />
        <Skeleton />
        <Skeleton />
        <Skeleton className="w-full h-56" />
        <Skeleton />
        <Skeleton />
      </div>
    </main>
  );
}
