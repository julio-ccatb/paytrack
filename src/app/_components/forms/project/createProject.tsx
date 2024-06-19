"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ProjectCreateManyInputSchema } from "pg/generated/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type z } from "zod";

const CreateProjectForm = () => {
  type TInput = z.infer<typeof ProjectCreateManyInputSchema>;

  const resolver = zodResolver(ProjectCreateManyInputSchema);

  const form = useForm<TInput>({
    resolver,
  });

  const { mutate, isSuccess } = api.project.create.useMutation({
    onSuccess: (project) => {
      toast({
        title: `Project added`,
        description: `${project.title} has been added correctly`,
        action: (
          <ToastAction altText="Add a project">Go to Projects</ToastAction>
        ),
      });
    },
  });
  const { data: customers } = api.customer.list.useQuery({});
  const { toast } = useToast();
  const onSubmit: SubmitHandler<TInput> = (data) => {
    console.log(data);

    mutate(data);
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        {!isSuccess ? (
          <>
            {" "}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title of project" {...field} />
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Decription</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write a short description of the project"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Description of the project function or goal.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified owner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers?.map((customer) => (
                        <SelectItem value={customer.id} key={customer.id}>
                          {`${customer.manager} - ${customer.organization}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Company or person reponsable for the project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified owner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem className="uppercase" value={"Active"}>
                        ACTIVE
                      </SelectItem>
                      <SelectItem className="uppercase" value={"Staged"}>
                        Staged
                      </SelectItem>
                      <SelectItem className="uppercase" value={"N/A"}>
                        N/A
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Project Status, default (ACTIVE)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Project start date.</FormDescription>
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

export default CreateProjectForm;
