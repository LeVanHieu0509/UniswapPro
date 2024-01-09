import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";

export function TransparentTabs() {
  const data = [
    {
      label: "Tất cả",
      value: "html",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Iphone 15",
      value: "react",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Iphone 14",
      value: "vue",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "Iphone 13",
      value: "angular",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Iphone 12",
      value: "svelte",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  return (
    <Tabs value="html" className="max-w-[40rem] mt-20">
      <TabsHeader
        placeholder
        className="bg-transparent"
        indicatorProps={{
          className: "mt-6 bg-transparent rounded-none shadow-none border-solid border-b-2 border-white",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab placeholder className="text-white" key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>

      <TabsBody placeholder>
        {data.map(({ value, desc }) => (
          <TabPanel className="text-white" key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
