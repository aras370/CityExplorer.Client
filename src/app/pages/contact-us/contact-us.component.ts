import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Contact Form Interface
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// Contact Info Interface
export interface ContactInfo {
  id: number;
  title: string;
  value: string;
  icon: string;
  link?: string;
}

// FAQ Interface
export interface FAQ {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-contact',
  templateUrl: './Contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ContactUsComponent implements OnInit {

  // Contact form model
  contactForm: ContactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  // Form submission state
  isSubmitting = false;
  isSubmitted = false;

  // Contact information
  contactInfo: ContactInfo[] = [
    // {
    //   id: 1,
    //   title: 'آدرس دفتر مرکزی',
    //   value: 'تهران، خیابان ولیعصر، پلاک ۱۲۳، طبقه ۵',
    //   icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
    // },
    {
      id: 2,
      title: 'شماره تماس',
      value: '09157898148',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      link: 'tel:+982112345678'
    },
    {
      id: 3,
      title: 'ایمیل پشتیبانی',
      value: 'hesamehsani72@yahoo.com',
      icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      link: 'mailto:support@worldplaces.ir'
    },
    {
      id: 4,
      title: 'ساعات پاسخگویی',
      value: 'شنبه تا پنج‌شنبه، ۹ صبح تا ۶ عصر',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  ];

  // FAQ data
  faqs: FAQ[] = [
    // {
    //   id: 1,
    //   question: 'چگونه می‌توانم اطلاعات مکان جدیدی را به سایت اضافه کنم؟',
    //   answer: 'شما می‌توانید از طریق فرم تماس با ما، اطلاعات مکان جدید را برای ما ارسال کنید. تیم ما اطلاعات را بررسی کرده و پس از تأیید، به سایت اضافه خواهد کرد.',
    //   isOpen: false
    // },
    {
      id: 2,
      question: 'آیا اطلاعات مکان‌ها به‌روزرسانی می‌شود؟',
      answer: 'بله، ما مرتباً اطلاعات مکان‌های گردشگری را به‌روزرسانی می‌کنیم. اگر اطلاعات نادرستی مشاهده کردید، لطفاً از طریق فرم تماس ما را مطلع کنید.',
      isOpen: false
    },
    {
      id: 3,
      question: 'آیا امکان رزرو هتل یا بلیط از طریق سایت وجود دارد؟',
      answer: 'در حال حاضر ما فقط اطلاعات مکان‌های گردشگری را ارائه می‌دهیم. برای رزرو هتل یا بلیط، شما را به سایت‌های معتبر مربوطه راهنمایی می‌کنیم.',
      isOpen: false
    },
    {
      id: 4,
      question: 'چگونه می‌توانم عضو خبرنامه شوم؟',
      answer: 'شما می‌توانید ایمیل خود را از طریق مسیر های ارتباطی که در سایت اعلام شده برای ما ارسال کنید تا اخبار جدید برای شما ارسال شوند.',
      isOpen: false
    },
    {
      id: 5,
      question: 'آیا امکان همکاری با سایت وجود دارد؟',
      answer: 'بله، ما همیشه به دنبال همکاری با افراد و سازمان‌های علاقه‌مند به گردشگری هستیم. لطفاً جزئیات همکاری مورد نظر خود را ارسال کنید.',
      isOpen: false
    }
  ];

  // Social media links
  socialLinks = [
    // {
    //   name: 'اینستاگرام',
    //   url: '#',
    //   icon: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001z'
    // },
    {
      name: 'تلگرام',
      url: '#',
      icon: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z'
    },
    // {
    //   name: 'توییتر',
    //   url: '#',
    //   icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'
    // },
    {
      name: 'لینکدین',
      url: '#',
      icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialize component
  }

  // Submit contact form
  onSubmit(): void {
    if (this.isValidForm()) {
      this.isSubmitting = true;

      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.resetForm();

        // Hide success message after 5 seconds
        setTimeout(() => {
          this.isSubmitted = false;
        }, 5000);
      }, 2000);
    }
  }

  // Validate form
  isValidForm(): boolean {
    return !!(
      this.contactForm.name.trim() &&
      this.contactForm.email.trim() &&
      this.contactForm.subject.trim() &&
      this.contactForm.message.trim()
    );
  }

  // Reset form
  resetForm(): void {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
  }

  // Toggle FAQ
  toggleFAQ(faq: FAQ): void {
    faq.isOpen = !faq.isOpen;
  }

  // Track by functions for performance
  trackByContactId(index: number, contact: ContactInfo): number {
    return contact.id;
  }

  trackByFaqId(index: number, faq: FAQ): number {
    return faq.id;
  }

  trackBySocialName(index: number, social: any): string {
    return social.name;
  }
}