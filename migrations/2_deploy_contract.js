const Mango=artifacts.require('./Mango.sol');
const MangoTokenSale=artifacts.require('./MangoTokenSale.sol');

module.exports=function(deployer){
    deployer.deploy(Mango,1000000).then(function(){
        var tokenPrice = 1000000000000000;
    return  deployer.deploy(MangoTokenSale , Mango.address,tokenPrice);

    });
};