import React from 'react'
import ChartRow from '../components/ChartRow'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
const Web3 = require('web3');
const mm = require('music-metadata-browser');

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(3)
  },
  image: {
    height: 64,
    width: 48
  }
})

const getAccount = async () => {
  const accounts = await window.ethereum.enable();
  return accounts[0]
};

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartList: '',
      completed: 0
    }
  }

  stateRefresh = () => {
    this.setState({
      chartList: '',
      completed: 0
    });
    this.callApi()
      .then(res => this.setState({ chartList: res }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({ chartList: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    let web3 = new Web3(Web3.givenProvider || "https://localhost:8545");
    var ContractAddr = "0x1026E715C2E5b4D6701200fD1e9Ff745189De48C";
    var ContractAbi = [
      {
        "constant": false,
        "inputs": [
          {
            "name": "key",
            "type": "address"
          },
          {
            "name": "path",
            "type": "string"
          }
        ],
        "name": "buyerSet",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "key",
            "type": "address"
          },
          {
            "name": "path",
            "type": "string"
          }
        ],
        "name": "sellerSet",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "recipient",
            "type": "address"
          },
          {
            "name": "path",
            "type": "string"
          }
        ],
        "name": "songTrade",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "path",
            "type": "string"
          }
        ],
        "name": "returnSeller",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "showAllBuyerList",
        "outputs": [
          {
            "components": [
              {
                "name": "buyerAddress",
                "type": "address[]"
              },
              {
                "name": "path",
                "type": "string[]"
              }
            ],
            "name": "",
            "type": "tuple"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "showAllSellerList",
        "outputs": [
          {
            "components": [
              {
                "name": "sellerAddress",
                "type": "address[]"
              },
              {
                "name": "path",
                "type": "string[]"
              }
            ],
            "name": "",
            "type": "tuple"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "key",
            "type": "address"
          }
        ],
        "name": "showBuyerList",
        "outputs": [
          {
            "name": "",
            "type": "string[]"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "key",
            "type": "address"
          }
        ],
        "name": "showSellerList",
        "outputs": [
          {
            "name": "",
            "type": "string[]"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ];
    var Contract = new web3.eth.Contract(ContractAbi, ContractAddr);
    console.log(Contract)
    var userAccount = await getAccount();
    var result = await Contract.methods.showAllBuyerList().call({ from: userAccount })
      .then(function (result) {
        if (result) {
          var path = result.path;
          var pathArrSize = result.path.length;

          var retList = [];
          var tmpList = [];
          var tmpMap = {};

          for (let i = 0; i < pathArrSize; i++) {
            if (tmpMap[path[i]] == undefined) {
              tmpList.push(path[i]);
              tmpMap[path[i]] = 1;
            }
            else {
              tmpMap[path[i]] = tmpMap[path[i]] + 1;
            }
          }

          console.log(tmpMap)

          var retMap = {};
          while (tmpList.length > 0) {
            var max = 0;
            var key;
            var idx;
            for (let i = 0; i < tmpList.length; i++) {
              if (tmpMap[tmpList[i]] > max) {
                max = tmpMap[tmpList[i]];
                key = tmpList[i];
                idx = i;
              }
            }
            retMap[key] = max;
            retList.push(key);
            delete tmpMap.key;
            tmpList.splice(idx, 1);
          }

          return [retMap, retList];
        }
        else console.log("error");
      });
    console.log(result);

    const metaDataParse = async (path) => {
      var metadataList = [];
      for (let i = 0; i < path.length; i++) {
        const audioTrackUrl = "https://ipfs.infura.io/ipfs/" + path[i];
        const metadata = await mm.fetchFromUrl(audioTrackUrl);
        metadataList.push(metadata)
        console.log(path[i])
        console.log(metadata)
      }
      return metadataList;
    };

    const returnChartData = async (metaDataList) => {
      ret = []
      var metaDataListSize = metaDataList.length;
      for (let i = 0; i < metaDataListSize; i++) {
        var metadata = metaDataList[i];
        var imgsrc = "data:image/png;base64," + btoa([].reduce.call(new Uint8Array(metadata.common.picture[0].data), function (p, c) { return p + String.fromCharCode(c) }, ''))
        var element = new Object();
        element["id"] = i + 1;
        element["image"] = imgsrc;
        element["singer"] = metadata.common.artist;
        element["song"] = metadata.common.title;

        console.log(element);

        ret.push(element);
      }
      return ret;
    }

    var chartData = await metaDataParse(result["1"]);
    var ret = await returnChartData(chartData);

    console.log(ret);
    return ret;

  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>순위</TableCell>
                <TableCell>앨범</TableCell>
                <TableCell>가수</TableCell>
                <TableCell>제목</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.chartList ?
                this.state.chartList.map(c => { return (<ChartRow className={classes.image} key={c.id} id={c.id} image={c.image} singer={c.singer} song={c.song} />) })
                :
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Chart);