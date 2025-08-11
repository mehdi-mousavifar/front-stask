"use client";
import * as React from "react";
import { GalleryVerticalEnd, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation"; // Added router import
import { SearchForm } from "@/components/search-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import DashboardProjectModal from "./dashboard/dashoard-project-modal";
import { useGetProjectsQuery } from "@/store/apis";

// This is sample data.


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter(); // Initialize router
  const { data } = useGetProjectsQuery();

  const handleProjectSelect = (projectId: string) => {
    // Navigate to project route
    router.push(`dashboard/project-tasks/${projectId}`);
  };

  const projectItems = data?.map((project) => (
    <SelectItem key={project.id} value={project.id.toString()}>
      {project.title}
    </SelectItem>
  ));

  return (
    <Sidebar className="bg-white" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
        <Separator />
        <DashboardProjectModal />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <Select onValueChange={handleProjectSelect}>
              {" "}
              {/* Added handler */}
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Project" />
              </SelectTrigger>
              <SelectContent className="bg-gray-100">
                <SelectGroup>
                  <SelectLabel>Projects</SelectLabel>
                  {projectItems}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Separator className="my-2" />

            <Button
              className="bg-yellow-200 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-900 font-semibold mt-3"
              variant="outline"
            >
              pending tasks
            </Button>

            <Button
              className="bg-sky-200 hover:bg-sky-300 text-sky-900 hover:text-sky-900 font-semibold "
              variant="outline"
            >
              in progress tasks
            </Button>
            <Button
              className="bg-green-200 hover:bg-green-300 text-green-900 hover:text-green-900 font-semibold mb-3"
              variant="outline"
            >
              completed tasks
            </Button>

            <Separator className="my-2" />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
