import { FC, useRef, useState } from 'react'
import { Flex, List, Radio, Typography, Input, InputProps, Button, Space } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

interface HeaderProps {
    addEffect: (value: string) => void
}

const Header: FC<HeaderProps> = (p) => {
    const { addEffect } = p
    const [inputValue, setInputValue] = useState('')
    const onInputChange: InputProps['onChange'] = (e) => {
        setInputValue(e.target.value)
    }
    const addHandle = () => {
        addEffect(inputValue)
        setInputValue('')
    }
    return <Space.Compact>
        <Input
            value={inputValue}
            onChange={onInputChange}
            onPressEnter={addHandle}
            placeholder='Create a new todo..'
        />
        <Button onClick={addHandle}>Add</Button>
    </Space.Compact>
}

interface ItemProps {
    done: boolean
    value: string
    label: string
}

const defaultItems: ItemProps[] = [{ label: 'test1', value: '0', done: false }]

const Main = () => {
    const [items, setItems] = useState<ItemProps[]>(defaultItems)
    const id = useRef(1)

    const addItem = (itemValue: string) => {
        if (itemValue) {
            setItems(items.concat([{ label: itemValue, value: "" + id.current++, done: false }]))
        }
    }

    const removeItem = (id: string) => {
        const newItems = items.filter((el) => el.value !== id)
        setItems(newItems)
    }

    const selectItem = (id: string) => {
        const current = items.find((el) => el.value === id)
        if (current) {
            current.done = !current.done
            setItems([...items])
        }
    }

    const selectAll = () => {
        setItems(items.map((el) => ({ ...el, done: true })))
    }

    const clearAll = () => {
        setItems(items.map((el) => ({ ...el, done: false })))
    }

    const activedCount = items.filter((el) => !el.done).length

    const footer = <Flex justify='space-between'>
        <div>{activedCount} items left</div>
        <Button type='link' disabled={!activedCount} onClick={selectAll}>all active completed</Button>
        <Button type='link' disabled={!!activedCount} onClick={clearAll}>clear completed</Button>
    </Flex>

    return <>
        <Header addEffect={addItem} />
        <List
            footer={footer}
            bordered
            dataSource={items}
            renderItem={(item) => (
                <List.Item>
                    <Radio checked={item.done} onClick={selectItem.bind(null, item.value)}>
                        <Typography.Text key={"" + item.done} delete={item.done} type={item.done ? "secondary" : undefined}>
                            {item.label}
                        </Typography.Text>
                    </Radio>
                    <CloseOutlined onClick={removeItem.bind(null, item.value)} />
                </List.Item>
            )}
        />
    </>
}

export default Main