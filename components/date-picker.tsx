import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { Slot } from "@radix-ui/react-slot";
import { useRef } from "react";
import { useDayRender } from "react-day-picker";

export function DatePicker() {
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]" />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function DatePickerDay(props: {
  date: Date;
  displayMonth: Date;
  asChild?: boolean;
  children?: React.ReactNode;
}) {
  // implement radix aschild with slot
  const Component = props.asChild ? Slot : "button";
  const buttonRef = useRef<HTMLButtonElement>(null);
  // @ts-expect-error - button ref is not used in this component
  const dayRender = useDayRender(props.date, props.displayMonth, buttonRef);

  if (dayRender.isHidden) {
    return <div role="gridcell"></div>;
  }
  if (!dayRender.isButton) {
    return <div {...dayRender.divProps} />;
  }
  return props.asChild ? (
    <Component {...dayRender.buttonProps}>{props.children}</Component>
  ) : (
    <button {...dayRender.buttonProps}>{props.date.getDate()}</button>
  );
}
