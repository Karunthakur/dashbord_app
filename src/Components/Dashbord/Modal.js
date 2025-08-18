import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Tabs } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import TabData from "./TabData"
import Forms from './Forms';

import "./Modal.css"


const PopUp = ({ state, setState, setOpen, id, setId }) => {
    const [next, setNext] = useState(false);
    const [widgetName, setWidgetName] = useState("");
    const [widgetText, setWidgetText] = useState("");
    const [ids, setIds] = useState(null)

    const [newState, setNewState] = useState({
        checked: false,
        widget_name: widgetName,
        widget_text: widgetText,
        children: [],
        id: new Date().getMilliseconds(),
        type: "checkbox",
    });

    const { TabPane } = Tabs;
    const onChange = (key) => {
        console.log(key);
    };
    const checked_F = (id, value, data) => {
        return data?.map((val) => {
            if (val.id === id) {
                return val.checked = value;
            }
            checked_F(id, val, data.children);
            return val;
        })
    }

    const onChecked = (e, id) => {
        setIds(id)
        const value = e.target.value;
        setState(checked_F(id, value, state));
    }

    const addNewWidget = (id, data) => {
        const update_N_W = data?.map((el) => {
            if (el.id === id) {
                el.children = [...el.children, { ...newState, id: new Date().getMilliseconds(), widget_name: widgetName, widget_text: widgetText }];
                return el
            }
            addNewWidget(id, el.children)
            return el;
        })
        return update_N_W;
    }

    const onConform = (id) => {
        setNext(true);
        if (widgetName !== "" || widgetText !== "") {
            setOpen(false);
            setState(addNewWidget(id, state));
        }
    }
    console.log(state)

    return (
        <div className='w-96 m-auto '>
            <div className='fixed left-1/2 top-0 right-0 bottom-0 bg-white m-auto p-6 rounded-lg shadow-lg'>
                <Card className='h-auto bg-white' title="Add Widget" extra={<span href='' onClick={() => setOpen(false)}><CloseOutlined /></span>} bordered={false} >
                    <p>Personalise your dashboard by adding the following widget</p>
                    {next ?
                        <>{state?.map((items) => items?.children.map((item) => item.id === ids &&
                                <Forms
                                    setId={setId}
                                    child_id={newState?.id}
                                    setState={setState}
                                    newState={newState}
                                    widgetName={widgetName}
                                    widgetText={widgetText}
                                    setWidgetText={setWidgetText}
                                    setWidgetName={setWidgetName}
                                    setNewState={setNewState}
                                />
                        ))}</>
                        :
                        <Tabs
                            tabBarStyle={{ backgroundColor: "white", color:"black" }}
                            defaultActiveKey='1'
                            onChange={onChange}
                        >

                            {state?.map((item) => {
                                return (
                                    <TabPane
                                        tab={<span className='text-yellow-500 m-12 text-center'>{item.label}</span>}
                                        key={item.id}
                                        className='w-auto border border-black-500'
                                    >
                                        {item?.children?.map((item) => {
                                            return (
                                                <TabData item={item} onChecked={onChecked} />
                                            )
                                        })}
                                    </TabPane>
                                )
                            })
                            }
                        </Tabs>
                    }
                    <div className="flex fixed justify-end top-auto left-0 right-4 bottom-2 p-2 m-2" >
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button onClick={() => onConform(id)}>Conform</Button>
                    </div>

                </Card>
            </div>
        </div>
    )   
};

export default PopUp;

PopUp.propTypes = {
    state: PropTypes.array,
    setOpen: PropTypes.func
}



