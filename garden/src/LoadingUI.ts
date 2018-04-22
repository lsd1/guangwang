//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class LoadingUI extends eui.Component implements RES.PromiseTaskReporter {
    private loading_bar:eui.Image;    
    public constructor() {
        super();
        this.skinName = '<?xml version="1.0" encoding="utf-8"?><e:Skin class="loading" width="750" height="1334" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing"><e:Image source="garden_png" left="0" right="0" top="0" bottom="0"/><e:Group width="500" height="433" horizontalCenter="0" anchorOffsetY="0" bottom="0"><e:Image source="undercolor_png" width="500" height="50" x="0" scaleX="1" scaleY="1" verticalCenter="0"/><e:Image id="loading_bar" source="load_bar_png" width="0" height="38" x="10" scaleX="1" scaleY="1" verticalCenter="0"/></e:Group></e:Skin>';  
    }
    public createView(){
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
    }
    public onProgress(current: number, total: number): void {
        this.loading_bar.width = current/total * 490;
    }
}
