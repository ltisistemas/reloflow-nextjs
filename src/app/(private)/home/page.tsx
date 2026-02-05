import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Kanban from "../kanban/page";

export default function HomePage() {
  return (
    <div className="flex flex-col size-full min-h-screen">
      <Sidebar />
      <Kanban />
    </div>
  );
}
