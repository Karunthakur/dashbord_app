import React, { useState } from "react";
import { Input, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

export default function Navbar({ data, setState, isInline }) {
    const [searchVal, setSearchVal] = useState('');
    const newTreeSearch = (data, value = "") => {
        const updateData = data.filter(function Search(el) {
            if (el.widget_name?.toLowerCase().includes(value?.toLowerCase())) return true;
            if (Array.isArray(el?.children)) {
                return (el.children = el.children.filter(Search)).length;
            }
        })
        return updateData;
    }

    const searchFilter = (e) => {
        const value = e.target.value;
        setSearchVal(value);
        setState(newTreeSearch(data, value))
    }

    const items = [
        {
            label: "Home",
            key: "home"
        },
        {
            label: "/",
            key: "contactUs"
        },
        {
            label: "About",
            key: "about"
        }
    ]

    return (
        <div key={data.id} className="flex justify-between">
            <ul className="flex flex-wrap text-center list-none m-2">
                <li className="m-2">
                    <Menu
                        // onClick={onClick}
                        style={{ width: 356 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode={isInline ? "inline" : "horizontal"}
                        items={items}
                    />
                </li>
            </ul>
            <ul className="flex flex-wrap text-center list-none m-4" >
                <li className="m-4">
                    <Input
                        size="small"
                        prefix={<SearchOutlined />}
                        onChange={searchFilter}
                        value={searchVal}
                        type="search"
                        disableUnderline
                        className=" w-22 h-6 sm:flex-none"
                        placeholder="Search..." />
                </li>
            </ul>
        </div>
    );
}

Navbar.propTypes = {
    data: PropTypes.array,
    setState: PropTypes.func,
}