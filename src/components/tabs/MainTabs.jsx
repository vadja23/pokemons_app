import * as React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { TabPokemonCharts } from '../pokemon_charts/TabPokemonCharts';
import { TabPokemonList } from '../pokemon_list/TabPokemonList';

const Panel = (props) => (
  <div hidden={props.value !== props.index}>
    <div className='tabs_page'>{props.children}</div>
  </div>
);

export function MainTabs() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <>
        <Tabs value={value} onChange={handleChange} centered className='tabs'>
            {/* информация о магазине и список покемонов */}
            <Tab label="Список покемонов" />
            {/* графика которая показывает распределение количества покемонов по различным типам */}
            <Tab label="Графики" />
        </Tabs>
        <Panel value={value} index={0}>
          <TabPokemonList />
        </Panel>
        <Panel value={value} index={1}>
          <TabPokemonCharts />
        </Panel>
        </>
    );
}