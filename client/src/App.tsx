import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

// Get the base path for GitHub Pages
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path={`${base}/`} component={Home} />
        <Route path={`${base}/*`} component={NotFound} />
      </Switch>
      <Toaster />
    </QueryClientProvider>
  );
}

export default Router;