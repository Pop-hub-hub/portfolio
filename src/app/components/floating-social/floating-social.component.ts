import { Component, OnInit, Renderer2, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floating-social',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-social.component.html',
  styleUrl: './floating-social.component.scss'
})
export class FloatingSocialComponent implements OnInit {
  isExpanded = false;
  private isDragging = false;
  private dragOffset = { x: 0, y: 0 };

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    // Load saved position from localStorage if available
    const savedPosition = localStorage.getItem('floatingSocialPosition');
    if (savedPosition) {
      const position = JSON.parse(savedPosition);
      this.renderer.setStyle(this.el.nativeElement.querySelector('.floating-social-container'), 'right', `${position.x}px`);
      this.renderer.setStyle(this.el.nativeElement.querySelector('.floating-social-container'), 'bottom', `${position.y}px`);
    }
  }

  toggleSocialLinks(event?: Event) {
    // Prevent default only if it's a touch event to avoid interfering with drag
    if (event && this.isDragging) {
      event.preventDefault();
      return;
    }
    
    this.isExpanded = !this.isExpanded;
  }

  expandSocialLinks() {
    // Only expand if not dragging
    if (!this.isDragging) {
      this.isExpanded = true;
    }
  }

  collapseSocialLinks() {
    // Only collapse if not dragging
    if (!this.isDragging) {
      this.isExpanded = false;
    }
  }

  startDrag(event: MouseEvent | TouchEvent) {
    // Prevent expanding when starting to drag
    if (event instanceof MouseEvent && event.button !== 0) return; // Only left mouse button
    
    this.isDragging = true;
    const container = this.el.nativeElement.querySelector('.floating-social-container');
    const rect = container.getBoundingClientRect();
    
    if (event instanceof MouseEvent) {
      this.dragOffset.x = event.clientX - rect.left;
      this.dragOffset.y = event.clientY - rect.top;
    } else if (event instanceof TouchEvent) {
      this.dragOffset.x = event.touches[0].clientX - rect.left;
      this.dragOffset.y = event.touches[0].clientY - rect.top;
    }
    
    this.renderer.listen('document', 'mousemove', this.onDrag.bind(this));
    this.renderer.listen('document', 'touchmove', this.onDrag.bind(this));
    this.renderer.listen('document', 'mouseup', this.stopDrag.bind(this));
    this.renderer.listen('document', 'touchend', this.stopDrag.bind(this));
    
    // Prevent default to avoid triggering other events
    event.preventDefault();
  }

  onDrag(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;
    
    const container = this.el.nativeElement.querySelector('.floating-social-container');
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    
    const x = clientX - this.dragOffset.x;
    const y = clientY - this.dragOffset.y;
    
    // Constrain to viewport
    const maxX = window.innerWidth - container.offsetWidth;
    const maxY = window.innerHeight - container.offsetHeight;
    
    const constrainedX = Math.max(0, Math.min(x, maxX));
    const constrainedY = Math.max(0, Math.min(y, maxY));
    
    this.renderer.setStyle(container, 'left', `${constrainedX}px`);
    this.renderer.setStyle(container, 'top', `${constrainedY}px`);
    this.renderer.setStyle(container, 'right', 'auto');
    this.renderer.setStyle(container, 'bottom', 'auto');
  }

  stopDrag() {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    
    // Save position to localStorage
    const container = this.el.nativeElement.querySelector('.floating-social-container');
    const rect = container.getBoundingClientRect();
    const position = {
      x: rect.left,
      y: window.innerHeight - rect.bottom
    };
    localStorage.setItem('floatingSocialPosition', JSON.stringify(position));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    // Center the icon on small screens
    const container = this.el.nativeElement.querySelector('.floating-social-container');
    if (window.innerWidth <= 768) {
      this.renderer.setStyle(container, 'left', '50%');
      this.renderer.setStyle(container, 'right', 'auto');
      this.renderer.setStyle(container, 'transform', 'translateX(-50%)');
    } else {
      this.renderer.setStyle(container, 'transform', 'none');
      // Restore saved position if available
      const savedPosition = localStorage.getItem('floatingSocialPosition');
      if (savedPosition) {
        const position = JSON.parse(savedPosition);
        this.renderer.setStyle(container, 'right', `${position.x}px`);
        this.renderer.setStyle(container, 'bottom', `${position.y}px`);
      }
    }
  }
}
