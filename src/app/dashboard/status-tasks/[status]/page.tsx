"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useGetTasksByStatusQuery } from "@/store/apis";
import { useParams } from "next/navigation";

const StatusTasksPage = () => {
  const params = useParams();
  const status = params.status as string;
  console.log(status);
  

  const { data } = useGetTasksByStatusQuery(status);

  const tasksRender = data?.map((task) => (
    <Card key={task.id} className="p-3">
      <div className="flex items-center gap-2">
        <p>title :</p>
        <Badge
          className="text-xs font-medium border-red-700 text-red-700"
          variant="outline"
        >
          {task.title}
        </Badge>
      </div>
      <div className="text-sm text-muted-foreground">{task.description}</div>
      <div>
        <Badge
          className="ml-2 text-xs font-medium border-blue-800 text-blue-800"
          variant="outline"
        >
          {task.status}
        </Badge>
        <Badge
          className="ml-2 text-xs font-medium border-blue-800 text-blue-800"
          variant="outline"
        >
          {task.priority}
        </Badge>
        <Badge
          className="ml-2 text-xs font-medium border-blue-800 text-blue-800"
          variant="outline"
        >
          {task.due_date}
        </Badge>
        <Badge
          className="ml-2 text-xs font-medium border-blue-800 text-blue-800"
          variant="outline"
        >
          {task.created_at.split("T")[0]}
        </Badge>
        {task.project_id && (
          <Badge
            className="ml-2 text-xs font-medium border-blue-800 text-blue-800"
            variant="outline"
          >
            {task.project_id}
          </Badge>
        )}
      </div>
    </Card>
  ));

  return <>{tasksRender}</>;
};

export default StatusTasksPage;
