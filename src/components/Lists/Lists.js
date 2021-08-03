import React from 'react'
import { Item } from 'semantic-ui-react';
import List from './List';

function Lists({lists}) {
    return (
        <div>
            <Item.Group>
                {lists.map(item => 
                    // <li key={item.id} >{item.title} {item.description}</li>
                    <List key={item.id} {...item}></List>
                )}
            </Item.Group>
        </div>
    )
}

export default Lists
