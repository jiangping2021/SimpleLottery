import React, {Component} from "react";
// import LotteryContract from "./contracts/Lottery.json";
import LotteryContract from "./contracts/Lottery.json";
import getWeb3 from "./getWeb3";
import CardExampleCard from "./display/ui";

class App extends Component {
    state = {
        web3: null, accounts: null, contract: null, address: null,
        currentAccount: null, manager: null, players: null, playersCount: 0, balance: 0, winner: null, round: 0,
        lastRoundWinners: null, lastSeeds: null
    }

    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = LotteryContract.networks[networkId]
            const address = deployedNetwork && deployedNetwork.address
            const instance = new web3.eth.Contract(LotteryContract.abi, address,);

            // Set web3, accounts, contract and address to the state, and then proceed with an
            // interacting with the contract's methods.
            this.setState({web3, accounts, contract: instance, address}, this.getData)
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };



    //获取上一期的获奖名单
    getLastRoundWinners = async ()=>{
        const { contract } = this.state;
        const winnerAddress =  await contract.methods.getLastRoundWinners().call()
        this.setState({ winnerAddress })
    }

    // 获取合约数据
    getData = async () => {
        const {web3, accounts, contract} = this.state;

        let manager = await contract.methods.getManager().call()
        let players = await contract.methods.getPlayers().call()
        let playersCount = await contract.methods.getPlayersCount().call()
        let balance = await contract.methods.getBalance().call()
        balance = web3.utils.fromWei(balance, 'ether')
        // let winner = await contract.methods.getWinner().call()
        let round = await contract.methods.getRound().call()
        let seeds = await contract.methods.getSeed().call()
        console.log('seeds:',seeds);
        let lastSeeds = await contract.methods.getLastSeeds().call();
        console.log('lastSeeds',lastSeeds);
        round = +round + 1
        let lastRoundWinners = await contract.methods.getLastRoundWinners().call() || {}
        console.log('lastRoundWinners: ', lastRoundWinners);
        let showButton = accounts[0] === manager ? 'inline' : 'none'

        this.setState({
            currentAccount: accounts[0],
            lastSeeds,
            manager,
            players,
            playersCount,
            balance,
            lastRoundWinners: [
                lastRoundWinners.firstPrizeWinners,
                lastRoundWinners.secondPrizeWinners,
            ],
            round,
            showButton,
            isClicked: false
        })
    }

    // 投注
    play = async (nums) => {
        const {web3, contract} = this.state;

        this.setState({isClicked: true})

        try {
            await contract.methods.play(nums).send({
                from: this.state.currentAccount,
                value: web3.utils.toWei('1', 'ether'),
                gas: 3000000,
            })

            this.setState({isClicked: false})
            window.location.reload(true) // 自动加载页面
            alert('投注成功！')
        } catch (err) {
            this.setState({isClicked: false})
            alert('投注失败！')
            console.log(err)
        }
    }

    // 开奖
    runLottery = async () => {
        const {contract} = this.state;

        this.setState({isClicked: true})

        try {
            await contract.methods.runLottery().send({
                from: this.state.currentAccount,
                gas: 3000000,
            })

            this.setState({isClicked: false})
            window.location.reload(true) // 自动加载页面
            alert('开奖成功！')
        } catch (err) {
            this.setState({isClicked: false})
            alert('开奖失败！')
            console.log(err)
        }
    }

    // 退奖
    refund = async () => {
        const {contract} = this.state;

        this.setState({isClicked: true})

        try {
            await contract.methods.refund().send({
                from: this.state.currentAccount,
                gas: 3000000,
            })

            this.setState({isClicked: false})
            window.location.reload(true) // 自动加载页面
            alert('退奖成功！')
        } catch (err) {
            this.setState({isClicked: false})
            alert('退奖失败！')
            console.log(err)
        }
    }

    render() {
        return (
            <div style={{padding: '4px'}}>
                <CardExampleCard
                    address={this.state.address}
                    currentAccount={this.state.currentAccount}
                    manager={this.state.manager}
                    players={this.state.players}
                    playersCount={this.state.playersCount}
                    balance={this.state.balance}
                    winner={this.state.winner}
                    lastSeeds={this.state.lastSeeds}
                    lastRoundWinners={this.state.lastRoundWinners}
                    round={this.state.round}
                    showButton={this.state.showButton} // 控制是否显示开奖、退奖按钮
                    isClicked={this.state.isClicked} // 控制投注、开奖、退奖按钮状态
                    play={this.play}
                    runLottery={this.runLottery}
                    refund={this.refund}
                />
            </div>
        );
    }
}

export default App;
