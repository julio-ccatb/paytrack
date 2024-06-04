import ClientsTable from "@/app/_components/tables/clientsTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ClientsPage = () => {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Clients</CardTitle>
        <CardDescription>Recent clients activities.</CardDescription>
      </CardHeader>
      <CardContent>
        <ClientsTable />
      </CardContent>
    </Card>
  );
};

export default ClientsPage;
