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
  private isDragging = false;
  private dragOffset = { x: 0, y: 0 };
  private touchStartX = 0;
  private touchStartY = 0;
  private touchStartTime = 0;
  private readonly TOUCH_THRESHOLD = 5; // pixels
  private readonly TAP_THRESHOLD = 200; // milliseconds

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

  onWhatsAppClick(event: Event) {
    // Only open link if not dragging
    if (!this.isDragging) {
      const link = event.currentTarget as HTMLAnchorElement;
      window.open(link.href, link.target || '_self');
    }
  }

  startDrag(event: MouseEvent | TouchEvent) {
    // Record initial touch position and time
    if (event instanceof TouchEvent && event.touches.length > 0) {
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
      this.touchStartTime = Date.now();
    } else if (event instanceof MouseEvent) {
      this.touchStartX = event.clientX;
      this.touchStartY = event.clientY;
      this.touchStartTime = Date.now();
    }

    // Prevent expanding when starting to drag
    if (event instanceof MouseEvent && event.button !== 0) return; // Only left mouse button

    this.isDragging = false; // Reset dragging state
    const container = this.el.nativeElement.querySelector('.floating-social-container');
    const rect = container.getBoundingClientRect();

    if (event instanceof MouseEvent) {
      this.dragOffset.x = event.clientX - rect.left;
      this.dragOffset.y = event.clientY - rect.top;
    } else if (event instanceof TouchEvent && event.touches.length > 0) {
      this.dragOffset.x = event.touches[0].clientX - rect.left;
      this.dragOffset.y = event.touches[0].clientY - rect.top;
    }

    // Add event listeners for drag and stop
    this.renderer.listen('document', 'mousemove', this.onDrag.bind(this));
    this.renderer.listen('document', 'touchmove', this.onDrag.bind(this), { passive: false });
    this.renderer.listen('document', 'mouseup', this.stopDrag.bind(this));
    this.renderer.listen('document', 'touchend', this.stopDrag.bind(this));

    // Prevent default to avoid triggering other events
    event.preventDefault();
  }

  onDrag(event: MouseEvent | TouchEvent) {
    const clientX = event instanceof MouseEvent ? event.clientX : 
                   event.touches.length > 0 ? event.touches[0].clientX : this.touchStartX;
    const clientY = event instanceof MouseEvent ? event.clientY : 
                   event.touches.length > 0 ? event.touches[0].clientY : this.touchStartY;

    // Calculate distance moved
    const deltaX = Math.abs(clientX - this.touchStartX);
    const deltaY = Math.abs(clientY - this.touchStartY);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const timeElapsed = Date.now() - this.touchStartTime;

    // Determine if this is a drag (moved beyond threshold or took enough time)
    if (!this.isDragging && (distance > this.TOUCH_THRESHOLD || timeElapsed > this.TAP_THRESHOLD)) {
      this.isDragging = true;
    }

    // If dragging, update position
    if (this.isDragging) {
      const container = this.el.nativeElement.querySelector('.floating-social-container');
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

      // Prevent scrolling on touch devices during drag
      if (event instanceof TouchEvent) {
        event.preventDefault();
      }
    }
  }

  stopDrag() {
    // Save position to localStorage if we were dragging
    if (this.isDragging) {
      const container = this.el.nativeElement.querySelector('.floating-social-container');
      const rect = container.getBoundingClientRect();
      const position = {
        x: rect.left,
        y: window.innerHeight - rect.bottom
      };
      localStorage.setItem('floatingSocialPosition', JSON.stringify(position));
    }

    // Reset state
    this.isDragging = false;
    this.touchStartTime = 0;
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