import CreateCustomerForm from "@/app/_components/forms/customer/createCustomer";
import ClientsTable from "@/app/_components/tables/clientsTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/cardenza";
import { api } from "@/trpc/server";
import { CirclePlus } from "lucide-react";

const ClientsPage = async () => {
  const customers = await api.customer.list({});
  return (
    <Card>
      <CardHeader className="grid grid-cols-2 flex-col px-7">
        <div className="space-y-2">
          <CardTitle>Clients</CardTitle>
          <CardDescription>All clients.</CardDescription>
        </div>

        <Credenza>
          <CredenzaTrigger className="flex items-end justify-end" asChild>
            <Button className="w-fit gap-1 justify-self-end text-sm">
              Create
              <CirclePlus />
            </Button>
          </CredenzaTrigger>
          <CredenzaContent>
            <CredenzaHeader>
              <CredenzaTitle>Customer</CredenzaTitle>
              <CredenzaDescription>Create a new customer.</CredenzaDescription>
            </CredenzaHeader>
            <CredenzaBody>
              <CreateCustomerForm />
            </CredenzaBody>
          </CredenzaContent>
        </Credenza>
      </CardHeader>
      <CardContent>
        <ClientsTable data={customers} />
      </CardContent>
    </Card>
  );
};

export default ClientsPage;
