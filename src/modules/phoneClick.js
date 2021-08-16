const phoneClick = () => {
  let arrow = document.querySelector('.header-contacts__arrow'),
    numberAccord = document.querySelector('.header-contacts__phone-number-accord'),
    phoneNumber = document.querySelectorAll('.header-contacts__phone-number')[1];
  
  arrow.addEventListener('click', () => {
    if (numberAccord.style.position === 'relative') {
      numberAccord.style.position = 'absolute';
      phoneNumber.style.opacity = 0;
      arrow.style.transform = 'rotate(0)';
    } else {
      numberAccord.style.position = 'relative';
      phoneNumber.style.opacity = 1;
      arrow.style.transform = 'rotate(180deg)';
    }
  });
};

export default phoneClick;