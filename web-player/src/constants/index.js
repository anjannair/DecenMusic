import * as Icon from '../component/icons'
import React from 'react'

export default {
  MOBILE_SIZE: 640,
}

export const MENU = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon.Home />,
    iconSelected: <Icon.HomeActive />
  },
  {
    title: 'Search',
    path: '/search',
    icon: <Icon.Search />,
    iconSelected: <Icon.SearchActive />
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <Icon.Profile />,
    iconSelected: <Icon.Profile />
  }
]

export const PLAYLISTBTN = [
    {
      title: 'Upload Songs',
      path: '/upload',
      ImgName: 'createPlaylist',
    },
]