"use client";
import { Button } from "@/components/ui/button";
import { CredenzaClose } from "@/components/ui/cardenza";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomerCreateWithoutProjectsInputSchema } from "pg/generated/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type z } from "zod";

const CreateCustomerForm = () => {
  type TInput = z.infer<typeof CustomerCreateWithoutProjectsInputSchema>;

  const resolver = zodResolver(CustomerCreateWithoutProjectsInputSchema);

  const form = useForm<TInput>({
    resolver,
  });

  const { mutate, isSuccess } = api.customer.create.useMutation({
    onSuccess: (customer) => {
      toast({
        title: `Customer added`,
        description: `${customer.manager} has been added correctly`,
        action: (
          <ToastAction altText="Add a project">Go to Projects</ToastAction>
        ),
      });
    },
  });
  const { toast } = useToast();
  const onSubmit: SubmitHandler<TInput> = (data) => {
    console.log(data);

    mutate(data);
  };

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        {!isSuccess ? (
          <>
            {" "}
            <FormField
              control={form.control}
              name="manager"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manager or Contact</FormLabel>
                  <FormControl>
                    <Input placeholder="Name of the contact" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is gonna be the display name for all comunications.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@jcodea.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Contact email, used as billing address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization</FormLabel>
                  <FormControl>
                    <Input placeholder="Self" {...field} />
                  </FormControl>
                  <FormDescription>
                    Company name or organization (optional).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <div className="flex items-center justify-center">
            {" "}
            <h2 className="text-xl text-accent-foreground ">Success</h2>
          </div>
        )}
        <div className="flex w-full flex-col gap-2 py-4">
          {!isSuccess && (
            <Button type="submit" className="w-full text-base">
              Submit
            </Button>
          )}
          <CredenzaClose>
            <Button
              type="reset"
              className="w-full text-base"
              variant={"destructive"}
            >
              {!isSuccess ? "Cancel" : "Close"}
            </Button>{" "}
          </CredenzaClose>
        </div>
      </form>
    </Form>
  );
};

export default CreateCustomerForm;
