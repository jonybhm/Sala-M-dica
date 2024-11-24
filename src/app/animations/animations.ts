import { trigger, group, style, animate, transition, query, animateChild, state } from '@angular/animations';


// export const slideInAnimation = trigger('routeAnimations', [
//   transition('* <=> *', [
//     style({ position: 'relative' }),
//     query(':enter, :leave', [
//       style({
//         position: 'relative',
//         top: 0,
//         left: 0,
//         width: '100%',
//         opacity: 0,
//         filter: 'blur(5px)'
//       })
//     ], { optional: true }),
//     query(':enter', [
//       style({ opacity: 0, filter: 'blur(10px)' })
//     ], { optional: true }),
//     group([
//       query(':leave', [
//         animate('1000ms ease-out', style({ opacity: 0, filter: 'blur(10px)' }))
//       ], { optional: true }),
//       query(':enter', [
//         animate('1000ms ease-out', style({ opacity: 1, filter: 'blur(0px)' }))
//       ], { optional: true })
//     ])
//   ])
// ]);


export const slideInAnimation = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ opacity: 0, transform: 'translateY(-200%)' }),
    animate('700ms cubic-bezier(0.68, -0.55, 0.27, 1.55)', style({ opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    style({ opacity: 1, transform: 'translateY(0)' }),
    animate('700ms cubic-bezier(0.68, -0.55, 0.27, 1.55)', style({ opacity: 0, transform: 'translateY(200%)' }))
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
