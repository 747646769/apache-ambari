/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component, AfterViewInit, Input, ViewChild, ElementRef} from '@angular/core';
import {ActionsService} from '../services/actions.service';

@Component({
  selector: 'menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.less']
})
export class MenuButtonComponent implements AfterViewInit {

  constructor(private actions: ActionsService) {
  }

  ngAfterViewInit() {
  }

  @ViewChild('dropdown')
  dropdown: ElementRef;

  @Input()
  title?: string;

  @Input()
  action: string;

  @Input()
  iconClassNames: string[];

  @Input()
  subItems?: any[];

  @Input()
  get hasSubItems(): boolean {
    return Boolean(this.subItems && this.subItems.length);
  }

  private clickStartTime: number;

  private readonly longClickInterval = 1000;

  onMouseDown() {
    this.clickStartTime = (new Date()).getTime();
  }

  onMouseUp(event: Event) {
    const clickEndTime = (new Date()).getTime();
    if (this.hasSubItems && clickEndTime - this.clickStartTime >= this.longClickInterval) {
      this.dropdown.nativeElement.classList.add('open');
    } else {
      this.actions[this.action]();
    }
    event.stopPropagation();
  }

}
