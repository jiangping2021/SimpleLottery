import React, { useState } from 'react'
import {Button, Card, Form, } from 'semantic-ui-react'

const options = new Array(10).fill(null).map((i, index) => ({
        key: index,
        text: index,
        value: index,
}));

const CardExampleCard = (props) => {
    const [nums, setNums] = useState(new Array(4).fill(null));

    const handleChange = (value, i) => {
        let numsCopy = [...nums];
        numsCopy[i] = value
        setNums(numsCopy)
    }

    const handleSubmit = () => {
        if (nums.some(n => !n && n !== 0)) {
            return alert('请先选择投注数字！');
        }

        props.play(nums);
    }

    return (
        <Card style={{width: '360px'}}>
            {/* <Image src='/images/lottery.jpg' wrapped ui={false}/> */}

            <Card.Content>
                {/*彩票*/}
                <Card.Meta>
                    <p>管理员地址：{props.manager}</p>
                    <p>当前地址：{props.currentAccount}</p>
                    {/* <p>上期中奖地址：{props.winner}</p> */}
                </Card.Meta>
                {/* <Card.Description>
                    每晚八点准时开奖，不见不散！
                </Card.Description> */}
            </Card.Content>

            {/* <Card.Content extra>
                <a>
                    <Icon name='user'/>
                    {props.playersCount}人参与
                </a>
            </Card.Content> */}

            {/* <Card.Content extra>
                <Statistic color='orange'>
                    <Statistic.Value>{props.balance}ETH</Statistic.Value>
                    <Statistic.Label>奖金池</Statistic.Label>
                </Statistic>
            </Card.Content> */}

            {/* <Card.Content extra>
                <Statistic color='blue'>
                    <Statistic.Value>第{props.round}期</Statistic.Value>
                    <a href={'https://ropsten.etherscan.io/address/' + props.address}>点击我查看交易历史</a>
                </Statistic>
            </Card.Content> */}
            
            <Card.Content>
                <Form>
                    <Form.Group>
                    {
                        nums.map((i, index) => (
                            <Form.Select
                                key={index}
                                fluid
                                options={options}
                                placeholder="0"
                                onChange={(e, { value }) => handleChange(value, index)}
                            />
                        ))
                    }
                    </Form.Group>
                </Form>
            </Card.Content>

            {/* <br/> */}
            <Button animated='fade' color='orange' onClick={handleSubmit} disabled={props.isClicked}>
                <Button.Content visible>投注</Button.Content>
                <Button.Content hidden>购买就有希望</Button.Content>
            </Button>
            <Button color='red' style={{display: props.showButton}} onClick={props.runLottery} disabled={props.isClicked}>
                开奖
            </Button>

            {/* <Button color='grey' style={{display: props.showButton}} onClick={props.refund} disabled={props.isClicked}>
                退奖
            </Button> */}

            {
                (props.lastRoundWinners || []).length ?
                <Card.Content extra>
                    <p>开奖号码：{(props.lastSeeds || []).join('，')}</p>
                    {
                        props.lastRoundWinners.map((sub, i) => (
                            <>
                                <div>
                                    <p>{["一", "二"][i]}等奖：</p>
                                    <div>
                                        {
                                            sub.map(a => <p>{a}</p>)
                                        }
                                    </div>
                                </div>
                                <br/>
                            </>
                        ))
                    }

                </Card.Content> : null
            }
{/* 
{
            (props.lastRoundWinners || []).length ?
                <Card.Content extra>
                    <p style={{fontWeight: 500}}>上期获奖记录</p>
                    <p>开奖号码：{(props.seeds || []).join('，')}</p>
                    {
                        props.lastRoundWinners.map((sub, i) => (
                            <>
                                <div>
                                    <p>{["一", "二"][i]}等奖：</p>
                                    <div>
                                        {
                                            sub.map(a => <p>{a}</p>)
                                        }
                                    </div>
                                </div>
                                <br/>
                            </>
                        ))
                    }

                </Card.Content> : null
            } */}

        </Card>
    )
}

export default CardExampleCard
