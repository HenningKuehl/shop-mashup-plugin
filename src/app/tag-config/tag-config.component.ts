import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MashupService} from "../services/mashup.service";
import {lastValueFrom} from "rxjs";
import {Tag} from '../models/tag';

@Component({
  selector: 'smp-tag-config',
  templateUrl: './tag-config.component.html',
  styleUrls: ['./tag-config.component.scss']
})
export class TagConfigComponent implements OnInit {
  @Input() mashupId!: string;
  @Input() tagId?: string;
  @Input() name = '';

  @Output() created = new EventEmitter<Tag>;
  @Output() updated = new EventEmitter<Tag>;
  @Output() deleted = new EventEmitter<string>;

  createNew = false;
  loading = false;

  constructor(private mashupService: MashupService) { }

  ngOnInit(): void {
    if (!this.tagId) {
      this.createNew = true;
    }
  }

  async crateOrSaveTag() {
    this.loading = true;
    chayns.showWaitCursor();
    if (this.createNew && this.name) {
      const tag = await lastValueFrom(this.mashupService.addTag(this.mashupId, this.name));
      this.name = '';
      this.created.emit(tag);
    } else if (this.tagId && this.name) {
      const tag = await lastValueFrom(this.mashupService.updateTag(this.mashupId, this.tagId, this.name));
      this.updated.emit(tag);
    }
    chayns.hideWaitCursor();
    this.loading = false;
  }

  async deleteTag() {
    this.loading = true;
    chayns.showWaitCursor();
    if (this.tagId) {
      const result = await lastValueFrom(this.mashupService.deleteTag(this.mashupId, this.tagId));
      this.deleted.emit(this.tagId);
    }
    chayns.hideWaitCursor();
    this.loading = false;
  }

  getHeaderTitle(): string {
    return this.createNew ? 'Tag hinzufügen' : this.name || 'Unbenannter Tag';
  }
}
