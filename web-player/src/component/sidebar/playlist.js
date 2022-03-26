import { Link } from "react-router-dom";

import styles from './playlist.module.css';

import TitleS from '../text/title-s';
import TextRegularM from '../text/text-regular-m';
import PlaylistButton from './playlist-button';
import { PLAYLISTBTN } from '../../constants';
import { PLAYLIST } from '../../data';

function Playlist() {
    return (
      <div className={styles.Playlist}>
        <TitleS>Upload</TitleS>

        <div>
          {PLAYLISTBTN.map((playlist) => {
            return (
                <PlaylistButton 
                  href={playlist.path} 
                  ImgName={playlist.ImgName}
                  key={playlist.title}
                >
                  {playlist.title}
                </PlaylistButton>
            );
          })}
        </div>
      </div>
    );
}
  
export default Playlist;