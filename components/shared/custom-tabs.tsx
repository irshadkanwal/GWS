import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type CustomTabsProps = {
  defaultValue: string;
  tabStyles?: string;
  tabs: {
    value: string;
    title: string;
    description?: string;
    content: React.ReactNode;
  }[];
};

function CustomTabs({ defaultValue, tabs, tabStyles }: CustomTabsProps) {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue={defaultValue}>
        <TabsList
          className={cn(
            "w-full justify-between px-0 bg-white border-b rounded-none pb-0 overflow-auto",
            tabStyles
          )}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="mb-0 h-full"
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="mt-4 min-w-full overflow-auto"
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default CustomTabs;
