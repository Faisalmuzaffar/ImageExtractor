import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

// Simple base URL handling for GitHub Pages
const base = location.hostname === 'faisalmuzaffar.github.io' ? '/ImageExtractor' : '';

function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch base={base}>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </QueryClientProvider>
  );
}

export default Router;