import { z } from "zod";

// Função para formatar CPF
export const formatCPF = (value: string) => {
  const cpf = value.replace(/\D/g, "");
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

// Função para formatar telefone
export const formatPhone = (value: string) => {
  const phone = value.replace(/\D/g, "");
  if (phone.length <= 10) {
    return phone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  } else {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
};

// Função para formatar valor monetário
export const formatCurrency = (value: string) => {
  const number = value.replace(/\D/g, "");
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(number) / 100);
};

// Função para validar CPF
export const validateCPF = (cpf: string) => {
  const cleanCPF = cpf.replace(/\D/g, "");
  
  if (cleanCPF.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
  
  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
  
  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(10))) return false;
  
  return true;
};

// Função para validar email
export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Função para validar telefone
export const validatePhone = (phone: string) => {
  const cleanPhone = phone.replace(/\D/g, "");
  return cleanPhone.length >= 10 && cleanPhone.length <= 11;
};

// Função para calcular idade
export const calculateAge = (birthDate: string) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

// Função para validar campo obrigatório
export const validateRequired = (value: string | number) => {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

// Função para validar campo vazio vs inválido
export const getFieldError = (
  value: string | number,
  validationFn: (val: string | number) => boolean,
  requiredMessage: string,
  invalidMessage: string
) => {
  if (!validateRequired(value)) {
    return requiredMessage;
  }
  
  if (!validationFn(value)) {
    return invalidMessage;
  }
  
  return "";
};

// Schema de validação para o passo 1 (Simulação)
export const simulationStepSchema = z.object({
  amount: z
    .number()
    .min(1000, "O valor mínimo é R$ 1.000")
    .max(100000, "O valor máximo é R$ 100.000"),
  installments: z
    .number()
    .min(6, "Mínimo de 6 parcelas")
    .max(60, "Máximo de 60 parcelas"),
});

// Schema de validação para o passo 2 (Dados Pessoais)
export const personalDataStepSchema = z.object({
  fullName: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
  cpf: z
    .string()
    .min(1, "CPF é obrigatório")
    .refine(validateCPF, "CPF inválido"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .refine(validatePhone, "Telefone inválido"),
  birthDate: z
    .string()
    .min(1, "Data de nascimento é obrigatória")
    .refine((date) => {
      const age = calculateAge(date);
      return age >= 18;
    }, "Você deve ter pelo menos 18 anos"),
});

// Schema de validação para o passo 3 (Dados Financeiros)
export const financialDataStepSchema = z.object({
  profession: z
    .string()
    .min(1, "Profissão é obrigatória")
    .min(2, "Profissão deve ter pelo menos 2 caracteres"),
  income: z
    .string()
    .min(1, "Renda é obrigatória")
    .refine((value) => {
      const number = parseFloat(value.replace(/\D/g, ""));
      return number >= 1000;
    }, "Renda deve ser pelo menos R$ 1.000"),
  monthlyExpenses: z
    .string()
    .min(1, "Despesas mensais são obrigatórias")
    .refine((value) => {
      const number = parseFloat(value.replace(/\D/g, ""));
      return number >= 0;
    }, "Despesas devem ser um valor válido"),
  hasProperty: z.boolean(),
  hasVehicle: z.boolean(),
});

// Schema de validação para o passo 4 (Revisão)
export const reviewStepSchema = z.object({
  agreeToTerms: z
    .boolean()
    .refine((value) => value === true, "Você deve concordar com os termos"),
});

// Schema completo do formulário
export const completeFormSchema = simulationStepSchema
  .merge(personalDataStepSchema)
  .merge(financialDataStepSchema)
  .merge(reviewStepSchema);

// Tipos TypeScript derivados dos schemas
export type SimulationStepData = z.infer<typeof simulationStepSchema>;
export type PersonalDataStepData = z.infer<typeof personalDataStepSchema>;
export type FinancialDataStepData = z.infer<typeof financialDataStepSchema>;
export type ReviewStepData = z.infer<typeof reviewStepSchema>;
export type CompleteFormData = z.infer<typeof completeFormSchema>;

// Função para validar um passo específico
export const validateStep = (step: number, data: any) => {
  try {
    switch (step) {
      case 1:
        simulationStepSchema.parse(data);
        break;
      case 2:
        personalDataStepSchema.parse(data);
        break;
      case 3:
        financialDataStepSchema.parse(data);
        break;
      case 4:
        reviewStepSchema.parse(data);
        break;
      default:
        return { isValid: false, errors: { message: "Passo inválido" } };
    }
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path) {
          errors[err.path[0] as string] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { message: "Erro de validação" } };
  }
};

// Funções de validação individual para campos específicos
export const validateField = {
  fullName: (value: string) => {
    if (!validateRequired(value)) return "Nome é obrigatório";
    if (value.trim().length < 3) return "Nome deve ter pelo menos 3 caracteres";
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) return "Nome deve conter apenas letras";
    return "";
  },
  
  cpf: (value: string) => {
    if (!validateRequired(value)) return "CPF é obrigatório";
    if (!validateCPF(value)) return "CPF inválido";
    return "";
  },
  
  email: (value: string) => {
    if (!validateRequired(value)) return "Email é obrigatório";
    if (!validateEmail(value)) return "Email inválido";
    return "";
  },
  
  phone: (value: string) => {
    if (!validateRequired(value)) return "Telefone é obrigatório";
    if (!validatePhone(value)) return "Telefone inválido";
    return "";
  },
  
  birthDate: (value: string) => {
    if (!validateRequired(value)) return "Data de nascimento é obrigatória";
    const age = calculateAge(value);
    if (age < 18) return "Você deve ter pelo menos 18 anos";
    return "";
  },
  
  profession: (value: string) => {
    if (!validateRequired(value)) return "Profissão é obrigatória";
    if (value.trim().length < 2) return "Profissão deve ter pelo menos 2 caracteres";
    return "";
  },
  
  income: (value: string) => {
    if (!validateRequired(value)) return "Renda é obrigatória";
    const number = parseFloat(value.replace(/\D/g, ""));
    if (number < 1000) return "Renda deve ser pelo menos R$ 1.000";
    return "";
  },
  
  monthlyExpenses: (value: string) => {
    if (!validateRequired(value)) return "Despesas mensais são obrigatórias";
    const number = parseFloat(value.replace(/\D/g, ""));
    if (number < 0) return "Despesas devem ser um valor válido";
    return "";
  },
  
  amount: (value: number) => {
    if (value < 1000) return "O valor mínimo é R$ 1.000";
    if (value > 100000) return "O valor máximo é R$ 100.000";
    return "";
  },
  
  installments: (value: number) => {
    if (value < 6) return "Mínimo de 6 parcelas";
    if (value > 60) return "Máximo de 60 parcelas";
    return "";
  },
}; 