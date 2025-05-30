import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 
const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().nonempty({
    message: "Password may not be empty",
  })
})
 
export function FirstTimePage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
 
    function onSubmit(data: z.infer<typeof FormSchema>) {
      fetch("/b/auth/first-time", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:  JSON.stringify(data, null, 2),
      }).then((res) => {
        if (res.redirected)
          window.location.replace(res.url)
      })
    }   
 
  return (
    <>
        <h3 className="font-bold text-lg">Welcome to Olingo!</h3>
        <p className="text-secondary mb-2">This is a first time installation screen. Here you can create your first account. Be aware that this account will have all administration rights.</p>
        <p className="text-secondary mb-5 text-xs">*You can create extra accounts and assing roles or permissions in your dashboard*</p>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="example@olingo.dev" {...field} required/>
                </FormControl>
                <FormMessage />
                </FormItem>
                
            )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input {...field} type="password" required/>
                </FormControl>
                <FormMessage />
                </FormItem>
                
            )}
            />
            <Button type="submit">Create my account</Button>
        </form>
        </Form>
    </>
  )
}