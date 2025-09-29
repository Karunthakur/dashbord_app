import React from "react";
import PropTypes, { array } from 'prop-types';
import { Card, Button, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Pie_Chart = React.lazy(() => import('./Pie'));
const Progress_Bar = React.lazy(() => import("./Progres"));

const Dashboard = ({ setOpen, setState, state, openAddWidget, searchVal }) => {

    const Data_Delete = (data, id) => {
        return data.filter((array) => {
            if (id === array.id) return false;
            if (Array.isArray(array.children)) {
               return array.children = Data_Delete(array.children, id);
            }
            return true;
        });
    }

    const handleDelete = (id) => {
        setState((prev) => Data_Delete(prev, id));
        setOpen(false);
    }

    return (
        <>
            {state.map((data) => (
                <>
                    <h2 style={{
                        fontWeight: 800,
                        fontSize: 16,
                    }}>{data.category}</h2>
                    <div key={data.id} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", margin: "-20px", padding: "20px" }}>
                        <>
                            {data.category === "CSPM Executive Dashboard" &&
                                <>
                                    {
                                        data.children.filter((w) =>
                                            w.widget_name?.toLowerCase().includes(searchVal?.toLowerCase())
                                        ).map((data) => (
                                            <div key={data.id} className="p-4">
                                                <Card hoverable className="flex w-96 h-52 border-4">
                                                    <span className="flex justify-between -m-4 font-normal" style={{ width: "76%" }}>
                                                        <h3 className="text-lg m-0 font-bold" >{data.widget_name}</h3>
                                                        <button
                                                            onClick={() => handleDelete(data.id)}
                                                            className="absolute top-1 right-2 text-red-500 text-sm"
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                    {data.children.length > 0 ?
                                                        <>
                                                            <div className="-m-4 mt-6">
                                                                <Pie_Chart data={data} />
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <div style={{ margin: "18px 92px" }}>
                                                                <Empty image="https://tse2.mm.bing.net/th?id=OIP.-KmpxNMaRHNOY5KNBw8YkAHaHa&pid=Api&P=0&h=180" />
                                                            </div>
                                                        </>
                                                    }
                                                </Card>
                                            </div>
                                        ))
                                    }</>
                            }
                        </>
                        <>
                            {data.category === "CWPP Dashboard:" &&
                                <>{data.children.filter((w) =>
                                    w.widget_name?.toLowerCase().includes(searchVal?.toLowerCase())
                                ).map((data) => (
                                    <>
                                        <div key={data.id} className="p-4">
                                            <Card hoverable className="flex w-96 h-52 border-4">
                                                <span className="flex justify-between -m-4 font-normal" style={{ width: "134%" }}>
                                                    <h3 className="text-lg m-0 font-bold">{data.widget_name}</h3>
                                                    <button
                                                        onClick={() => handleDelete(data.id)}
                                                        className="absolute top-1 right-2 text-red-500 text-sm"
                                                    >
                                                        ×
                                                    </button> </span>
                                                {data.children.length > 0 ?
                                                    <>
                                                        <div className="-m-4 mt-6">
                                                            <Progress_Bar data={data} />
                                                        </div>
                                                    </>
                                                    :
                                                    <div style={{ margin: "18px 92px" }}>
                                                        <Empty image="https://tse2.mm.bing.net/th?id=OIP.-KmpxNMaRHNOY5KNBw8YkAHaHa&pid=Api&P=0&h=180" />
                                                    </div>
                                                }

                                            </Card>
                                        </div>
                                    </>
                                ))}
                                </>
                            }
                        </>
                        <>
                            {data.category === "Registry Scan" &&
                                <>
                                    {
                                        data.children.filter((w) =>
                                            w.widget_name?.toLowerCase().includes(searchVal?.toLowerCase())
                                        ).map((data) => (
                                            <div key={data.id} className="p-4">
                                                <Card hoverable className="flex w-96 h-52 border-4">
                                                    <span className="flex justify-between -m-4 font-normal" style={{ width: "110%" }}>
                                                        <h3 className="text-lg m-0 font-bold">{data.widget_name}</h3>
                                                        <button
                                                            onClick={() => handleDelete(data.id)}
                                                            className="absolute top-1 right-2 text-red-5    00 text-sm"
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                    {data.children.length > 0 ?
                                                        <>
                                                            <div className="-m-4 mt-6">
                                                                <Progress_Bar data={data} />
                                                            </div>
                                                        </> :
                                                        <>
                                                            <div style={{ margin: "18px 92px" }}  >
                                                                <Empty image="https://tse2.mm.bing.net/th?id=OIP.-KmpxNMaRHNOY5KNBw8YkAHaHa&pid=Api&P=0&h=180" />
                                                            </div>
                                                        </>
                                                    }

                                                </Card>
                                            </div>
                                        ))
                                    }</>
                            }
                        </>
                        <div className="p-4">
                            <Card hoverable className="flex w-96 h-52 border-4">
                                <Button onClick={() => openAddWidget(data.id)} style={{ margin: "48px 92px" }} icon={<PlusOutlined />} iconPosition={"start"}>
                                    AddWidget
                                </Button>
                            </Card>
                        </div>
                    </div >
                </>
            ))
            }
        </>
    )
}

Dashboard.propTypes = {
    state: PropTypes.array,
    setState: PropTypes.func,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
}

export default Dashboard;