import { Component } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { CloudService } from '../../services/cloud.service';
import { StreamState } from '../../interfaces/stream-state';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  files: Array<any> = [];
  state: StreamState;
  currentFile: any = {};

  constructor(private audioService: AudioService, cloudService: CloudService, public auth: AuthService) {
    // get media files
    cloudService.getFiles().subscribe(files => {
      this.files = files;
    });

    // listen to stream state
    this.audioService.getState()
    .subscribe(state => {
      this.state = state;
    });
    this.audioService.play();
    console.log(this.state,'state const');
    console.log(this.state.currentTime,'cureent time const');
    
    
  }




  playStream(url) {
    this.audioService.playStream(url)
    .subscribe((event: Event) => {
     });
  }

  openFile(file, index) {
    // localStorage.setItem('currentFile', file);
    // localStorage.setItem('fileIndex', index);
    // localStorage.setItem('fileUrl', file.url);
    this.currentFile = { index, file };
    // console.log(this.currentFile,'curetn');
    // localStorage.setItem('fileObj',this.currentFile);
    this.audioService.stop();
    this.playStream(file.url);
    console.log(this.state,'state file click');
    console.log(this.state.currentTime,'cureent time file click');
  }

  pause() {
    let fileUrl = localStorage.getItem('fileUrl');
    localStorage.setItem('fileObj',this.currentFile);
    //this.currentFile = { fileIndex, currentFile };
    
   
    this.audioService.pause();
  }

  play() {
    // console.log('play');
    // let timeDuration = localStorage.getItem('cureenttime');
    // let FileCurrent = localStorage.getItem('currentFile');
    // let indexFile = Number(localStorage.getItem('fileIndex'));
    // let fileUrl = localStorage.getItem('fileUrl');
    // let fileObj = localStorage.getItem('fileObj');
    // if (timeDuration) {
    //   console.log('if time in p');
    //   this.playStream(fileUrl);
    //   this.audioService.play();
    // }
   
    console.log(this.state,'state play');
    console.log(this.state.currentTime,'cureent time play');
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }
}
