import React from 'react';
import { AddAlertOutlined, ColorLensOutlined, ImageOutlined, MoreVertOutlined, PersonAddAlt1Outlined } from '@mui/icons-material';
import ArchiveOutlined from '@mui/icons-material/ArchiveOutlined';
import {IconButton} from '@mui/material';

const Icons = () => {
  return <div style={{display: 'flex',width: '80%',justifyContent: 'space-around'}}>
    <div> 
    <IconButton>
      <AddAlertOutlined fontSize='small' />
    </IconButton>
    </div>
    <div>
    <IconButton>
      <PersonAddAlt1Outlined fontSize='small' />
    </IconButton>
    </div>
    <div>
    <IconButton>
      <ColorLensOutlined fontSize='small' />
    </IconButton>
    </div>
    <div>
    <IconButton>
      <ImageOutlined fontSize='small' />
    </IconButton>
    </div>
    <div>
    <IconButton>
      <ArchiveOutlined fontSize='small' />
    </IconButton>
    </div>
    <div>
    <IconButton>
      <MoreVertOutlined fontSize='small' />
    </IconButton>
    </div>
  </div>;
}

export default Icons;