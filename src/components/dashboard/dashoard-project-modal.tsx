"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useCreateProjectMutation } from "@/store/apis";

const DashboardProjectModal = () => {
  const [addProject, { isLoading, isSuccess }] = useCreateProjectMutation();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title,
      description,
    };
    console.log(data);
    await addProject(data);
  };
  React.useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setDescription("");
    }
  }, [isSuccess]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">create new Project</Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-8 sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>add a Project</DialogTitle>
            <DialogDescription>
              you can add as many Project as you want
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                name="title"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              className="bg-gray-100 hover:bg-gray-200 hover:cursor-pointer hov text-black"
              variant={"secondary"}
              type="submit"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardProjectModal;
