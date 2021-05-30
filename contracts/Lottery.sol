pragma solidity >=0.4.21 <0.7.0;

import "@openzeppelin/upgrades-core/contracts/Initializable.sol";

contract Lottery is Initializable {
    address payable manager;
    address payable[] players;
    uint256 [] internal seeds;
    uint256 [] public lastSeeds;
//
    address payable[] currentFirstPrize;
    address payable[] currentSecondPrize;

    address payable[] lastFirstPrize;
    address payable[] lastSecondPrize;

    uint round;

    function initialize() public initializer {
        manager = msg.sender;
        round++;
        createSeeds();

    }

    // 定义onlyManager修饰器
    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }

    /*
     * 投注
     */
    function play(uint256[] memory _input) payable public returns (bool){
        require(msg.value == 1 ether);
        players.push(msg.sender);
        compareUserInputNumbers(_input);
        return true;
    }

    function compareUserInputNumbers(uint256[] memory _input) internal{
        uint256 res = calculationResult(_input);
        if(res==4){
            currentFirstPrize.push(msg.sender);
        }else if(res==3){
            currentSecondPrize.push(msg.sender);
        }

    }


    function createSeeds() internal {
        delete seeds;
        for(uint i = 0;i<4;i++){
            uint256 v = uint256(keccak256(abi.encodePacked(block.difficulty,now*i)));
            seeds.push(v%9);
        }
    }


    function calculationResult(uint256[] memory _input) internal returns(uint256){

        uint256 finalHits;
        uint256 currentHits;

        for(uint256 i = 0;i<seeds.length;i++){
            for(uint256 j=0;j<_input.length;j++){
                if(_input[j]==seeds[i]){
                    for(uint256 k=j;k<_input.length;k++){
                        if(i+k-j>seeds.length-1){
                            break;
                        }

                        if(_input[k]==seeds[i+k-j]){
                            currentHits++;
                        }else{
                            if(currentHits<3){
                                currentHits = 0;
                            }
                        }

                        if(k==_input.length-1){
                            if(currentHits<3){
                                currentHits=0;
                            }
                        }
                    }
                }
                if(currentHits>finalHits){
                    finalHits = currentHits;
                }
                currentHits=0;
            }
        }
        return finalHits;
    }


    /*
     * 获取管理员地址
     */
    function getManager() public view returns (address) {
        return manager;
    }

    /*
     * 获取合约余额
     */
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getLastRoundWinners() public view returns(address payable[] memory firstPrizeWinners,address payable[] memory secondPrizeWinners){
        firstPrizeWinners = lastFirstPrize;
        secondPrizeWinners = lastSecondPrize;
    }


    /*
     * 获取彩民池
     */
    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    /*
     * 获取彩民池人数
     */
    function getPlayersCount() public view returns (uint) {
        return players.length;
    }

//   本次开奖号码
    function getSeed() public view returns(uint256[] memory){
        return seeds;
    }

    function getLastSeeds() public view returns(uint256[] memory){
        return lastSeeds;
    }

//   开奖
    function runLottery() external onlyManager{
        lastFirstPrize = currentFirstPrize;
        lastSecondPrize = currentSecondPrize;
        lastSeeds = seeds;
        createSeeds();
        delete currentFirstPrize;
        delete currentSecondPrize;
    }

    function getRound() public returns(uint){
        return round;
    }
}
