import { trigger, group, style, animate, transition, query, animateChild, state } from '@angular/animations';


export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'relative',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 0,
        filter: 'blur(5px)'
      })
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, filter: 'blur(10px)' })
    ], { optional: true }),
    group([
      query(':leave', [
        animate('1000ms ease-out', style({ opacity: 0, filter: 'blur(10px)' }))
      ], { optional: true }),
      query(':enter', [
        animate('1000ms ease-out', style({ opacity: 1, filter: 'blur(0px)' }))
      ], { optional: true })
    ])
  ])
]);




  
  export const hideAnimation = trigger('simpleFadeToggle', [
    state('shown', style({
      opacity: 1,
      height: '*'
    })),
    state('hidden', style({
      opacity: 0,
      height: '0px',
      overflow: 'hidden'
    })),
    transition('shown => hidden',[
      animate('500ms ease-out')
    ]),
    transition('hidden => shown',[
      animate('500ms ease-in')
    ])
  ])