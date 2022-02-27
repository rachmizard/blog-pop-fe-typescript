import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

interface MoleculeTabsProps {
  selectedTabIndex: number;
  defaultIndex?: number;
  contents: ContentProps[];
  onChangeTab: (index: number) => void;
}

interface ContentProps {
  title: string;
  component: React.ReactNode;
}

const MoleculeTabs: React.FC<MoleculeTabsProps> = ({
  selectedTabIndex,
  defaultIndex = 0,
  contents,
  onChangeTab,
}) => {
  return (
    <Tabs
      defaultIndex={defaultIndex}
      index={selectedTabIndex}
      onChange={(index) => onChangeTab(index)}
      isFitted
      isLazy
    >
      <TabList>
        {contents.map(({ title }, index) => {
          return (
            <Tab tabIndex={index} key={`key-${title}`}>
              {title}
            </Tab>
          );
        })}
      </TabList>
      <TabPanels>
        {contents.map(({ component }, index) => (
          <TabPanel tabIndex={index} key={`tab-panel-${index}`}>
            {component}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
export default MoleculeTabs;
