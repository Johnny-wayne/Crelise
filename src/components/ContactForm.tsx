import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import ValidatedInput from "@/components/ValidatedInput";
import { formatPhone, validateField } from "@/lib/validation";
import { z } from "zod";

// Schema de validação para o formulário de contato
const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .refine((phone) => {
      const cleanPhone = phone.replace(/\D/g, "");
      return cleanPhone.length >= 10 && cleanPhone.length <= 11;
    }, "Telefone inválido"),
  subject: z
    .string()
    .min(1, "Assunto é obrigatório")
    .min(5, "Assunto deve ter pelo menos 5 caracteres")
    .max(100, "Assunto deve ter no máximo 100 caracteres"),
  message: z
    .string()
    .min(1, "Mensagem é obrigatória")
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(500, "Mensagem deve ter no máximo 500 caracteres"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Funções de validação específicas para o formulário de contato
const contactValidation = {
  name: (value: string) => {
    if (!value.trim()) return "Nome é obrigatório";
    if (value.trim().length < 3) return "Nome deve ter pelo menos 3 caracteres";
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) return "Nome deve conter apenas letras";
    return "";
  },
  
  email: (value: string) => {
    if (!value.trim()) return "Email é obrigatório";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email inválido";
    return "";
  },
  
  phone: (value: string) => {
    if (!value.trim()) return "Telefone é obrigatório";
    const cleanPhone = value.replace(/\D/g, "");
    if (cleanPhone.length < 10 || cleanPhone.length > 11) return "Telefone inválido";
    return "";
  },
  
  subject: (value: string) => {
    if (!value.trim()) return "Assunto é obrigatório";
    if (value.trim().length < 5) return "Assunto deve ter pelo menos 5 caracteres";
    if (value.trim().length > 100) return "Assunto deve ter no máximo 100 caracteres";
    return "";
  },
  
  message: (value: string) => {
    if (!value.trim()) return "Mensagem é obrigatória";
    if (value.trim().length < 10) return "Mensagem deve ter pelo menos 10 caracteres";
    if (value.trim().length > 500) return "Mensagem deve ter no máximo 500 caracteres";
    return "";
  },
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    try {
      contactFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });
      
      // Limpar formulário
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } else {
      toast({
        title: "Erro de Validação",
        description: "Por favor, corrija os campos obrigatórios.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-blue-800 text-2xl">Entre em Contato</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ValidatedInput
              id="name"
              label="Nome Completo"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
              error={errors.name}
              required
              placeholder="Digite seu nome completo"
              validateOnChange={true}
              validationFn={contactValidation.name}
            />
            <ValidatedInput
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              error={errors.email}
              required
              placeholder="seu@email.com"
              validateOnChange={true}
              validationFn={contactValidation.email}
            />
          </div>
          
          <ValidatedInput
            id="phone"
            label="Telefone"
            value={formData.phone}
            onChange={(value) => setFormData({ ...formData, phone: value })}
            error={errors.phone}
            required
            placeholder="(00) 00000-0000"
            formatValue={formatPhone}
            maxLength={15}
            validateOnChange={true}
            validationFn={contactValidation.phone}
          />
          
          <ValidatedInput
            id="subject"
            label="Assunto"
            value={formData.subject}
            onChange={(value) => setFormData({ ...formData, subject: value })}
            error={errors.subject}
            required
            placeholder="Digite o assunto da sua mensagem"
            maxLength={100}
            validateOnChange={true}
            validationFn={contactValidation.subject}
          />
          
          <div className="space-y-2">
            <label 
              htmlFor="message" 
              className="text-blue-700 after:content-['*'] after:ml-1 after:text-red-500"
            >
              Mensagem
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full p-3 border-2 rounded-md transition shadow-sm resize-none ${
                errors.message 
                  ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200" 
                  : "border-blue-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
              }`}
              rows={5}
              placeholder="Digite sua mensagem..."
              maxLength={500}
            />
            {errors.message && (
              <p className="text-sm text-red-500 font-medium">{errors.message}</p>
            )}
            <p className="text-xs text-gray-500 text-right">
              {formData.message.length}/500 caracteres
            </p>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-pink-500 text-white font-bold shadow-lg hover:from-blue-700 hover:to-pink-600 transition"
          >
            Enviar Mensagem
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm; 