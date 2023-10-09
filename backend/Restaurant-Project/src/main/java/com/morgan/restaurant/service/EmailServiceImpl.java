package com.morgan.restaurant.service;

import com.morgan.restaurant.dto.Mail;
import com.morgan.restaurant.util.Code;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;


@Service
public class EmailServiceImpl implements EmailService{

    private JavaMailSender mailSender;
    private Code code = new Code();

    @Autowired
    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    @Async
    public void sendCodyByMail(Mail mail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("mosaab.morgan@gmail.com");
        message.setTo(mail.getSendTo());
        message.setSubject("Mail Activation");
        message.setText(mail.getCode());
        mailSender.send(message);
    }
}
