import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell'

class ChartRow extends React.Component {
    render() {
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt="profile"></img></TableCell>
                <TableCell>{this.props.singer}</TableCell>
                <TableCell>{this.props.song}</TableCell>
            </TableRow>
        )
    }
}

export default ChartRow;