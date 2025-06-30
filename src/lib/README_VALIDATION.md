# Sistema de Validação de Formulários

Este sistema fornece validação completa para formulários com formatação automática de campos e mensagens de erro personalizadas, incluindo validação dinâmica em tempo real.

## Componentes Principais

### 1. ValidatedInput
Componente de input com validação integrada que exibe mensagens de erro automaticamente.

```tsx
import ValidatedInput from "@/components/ValidatedInput";

<ValidatedInput
  id="cpf"
  label="CPF"
  value={formData.cpf}
  onChange={(value) => setFormData({ ...formData, cpf: value })}
  error={errors.cpf}
  required
  placeholder="000.000.000-00"
  formatValue={formatCPF}
  maxLength={14}
  validateOnChange={true}
  validationFn={validateField.cpf}
/>
```

### 2. Funções de Formatação
Funções para formatar automaticamente campos específicos:

- `formatCPF(value)` - Formata CPF (000.000.000-00)
- `formatPhone(value)` - Formata telefone ((00) 00000-0000)
- `formatCurrency(value)` - Formata valores monetários

### 3. Funções de Validação
Funções para validar dados específicos:

- `validateCPF(cpf)` - Valida CPF brasileiro
- `validateEmail(email)` - Valida formato de email
- `validatePhone(phone)` - Valida telefone brasileiro
- `calculateAge(birthDate)` - Calcula idade a partir da data de nascimento
- `validateRequired(value)` - Verifica se o campo não está vazio

### 4. Validação Dinâmica
O sistema agora suporta validação em tempo real:

- **validateOnChange**: Ativa validação conforme o usuário digita
- **validationFn**: Função personalizada de validação
- **Mensagens diferenciadas**: "Campo obrigatório" vs "Valor inválido"

## Como Implementar Validação

### 1. Definir Schema de Validação (Zod)

```tsx
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  cpf: z
    .string()
    .min(1, "CPF é obrigatório")
    .refine(validateCPF, "CPF inválido"),
});

type FormData = z.infer<typeof formSchema>;
```

### 2. Implementar Estado e Validação

```tsx
const [formData, setFormData] = useState<FormData>({
  name: "",
  email: "",
  cpf: "",
});

const [errors, setErrors] = useState<Record<string, string>>({});

const validateForm = () => {
  try {
    formSchema.parse(formData);
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
```

### 3. Usar ValidatedInput com Validação Dinâmica

```tsx
<ValidatedInput
  id="name"
  label="Nome Completo"
  value={formData.name}
  onChange={(value) => setFormData({ ...formData, name: value })}
  error={errors.name}
  required
  placeholder="Digite seu nome completo"
  validateOnChange={true}
  validationFn={validateField.fullName}
/>

<ValidatedInput
  id="cpf"
  label="CPF"
  value={formData.cpf}
  onChange={(value) => setFormData({ ...formData, cpf: value })}
  error={errors.cpf}
  required
  placeholder="000.000.000-00"
  formatValue={formatCPF}
  maxLength={14}
  validateOnChange={true}
  validationFn={validateField.cpf}
/>
```

### 4. Validar no Submit

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  if (validateForm()) {
    // Enviar dados
    toast({
      title: "Sucesso!",
      description: "Formulário enviado com sucesso.",
    });
  } else {
    toast({
      title: "Erro de Validação",
      description: "Por favor, corrija os campos obrigatórios.",
      variant: "destructive",
    });
  }
};
```

## Validação por Etapas (Stepper)

Para formulários com múltiplas etapas, use a função `validateStep`:

```tsx
import { validateStep } from "@/lib/validation";

const handleNext = () => {
  const stepData = getStepData(currentStep);
  const validation = validateStep(currentStep, stepData);
  
  if (!validation.isValid) {
    setErrors(validation.errors);
    return false;
  }
  
  setErrors({});
  setCurrentStep(currentStep + 1);
  return true;
};
```

## Validação Dinâmica

### Funcionalidades

1. **Validação em Tempo Real**: Campos são validados conforme o usuário digita
2. **Mensagens Diferenciadas**: 
   - "Campo obrigatório" quando vazio
   - "Valor inválido" quando preenchido incorretamente
3. **Validação no Foco/Blur**: Campos são validados quando o usuário sai do campo
4. **Estado de Toque**: Campos só são validados após o primeiro toque

### Como Usar

```tsx
<ValidatedInput
  id="email"
  label="Email"
  type="email"
  value={formData.email}
  onChange={(value) => setFormData({ ...formData, email: value })}
  error={errors.email}
  required
  validateOnChange={true}
  validationFn={validateField.email}
/>
```

### Funções de Validação Disponíveis

```tsx
import { validateField } from "@/lib/validation";

// Funções pré-definidas
validateField.fullName(value)    // Nome completo
validateField.cpf(value)         // CPF brasileiro
validateField.email(value)       // Email
validateField.phone(value)       // Telefone brasileiro
validateField.birthDate(value)   // Data de nascimento (18+ anos)
validateField.profession(value)  // Profissão
validateField.income(value)      // Renda mensal
validateField.monthlyExpenses(value) // Despesas mensais
validateField.amount(value)      // Valor do empréstimo
validateField.installments(value) // Número de parcelas
```

### Criando Validações Personalizadas

```tsx
const customValidation = {
  customField: (value: string) => {
    if (!value.trim()) return "Campo obrigatório";
    if (value.length < 5) return "Mínimo 5 caracteres";
    if (!/^[a-z]+$/.test(value)) return "Apenas letras minúsculas";
    return "";
  }
};

<ValidatedInput
  id="customField"
  label="Campo Personalizado"
  value={formData.customField}
  onChange={(value) => setFormData({ ...formData, customField: value })}
  validateOnChange={true}
  validationFn={customValidation.customField}
/>
```

## Campos Obrigatórios

Para marcar campos como obrigatórios, use a prop `required`:

```tsx
<ValidatedInput
  id="email"
  label="Email"
  required
  // ... outras props
/>
```

Isso automaticamente:
- Adiciona um asterisco vermelho (*) ao label
- Aplica validação obrigatória no schema
- Exibe mensagem de erro se o campo estiver vazio

## Estilização de Erros

Os campos com erro automaticamente:
- Mudam a cor da borda para vermelho
- Exibem mensagem de erro abaixo do campo
- Aplicam foco vermelho quando selecionados
- Priorizam erro externo sobre erro local

## Validações Específicas

### Idade
- **Mínimo**: 18 anos (sem limite máximo)
- **Mensagem**: "Você deve ter pelo menos 18 anos"

### CPF
- **Formato**: 000.000.000-00
- **Validação**: Dígitos verificadores matemáticos
- **Mensagens**: "CPF é obrigatório" / "CPF inválido"

### Telefone
- **Formato**: (00) 00000-0000
- **Validação**: 10-11 dígitos
- **Mensagens**: "Telefone é obrigatório" / "Telefone inválido"

### Email
- **Formato**: email@dominio.com
- **Validação**: Regex padrão
- **Mensagens**: "Email é obrigatório" / "Email inválido"

## Exemplos de Uso

### Formulário Simples
Veja `ContactForm.tsx` para um exemplo completo de formulário com validação dinâmica.

### Formulário com Etapas
Veja `Simulator.tsx` para um exemplo de formulário com múltiplas etapas e validação por passo.

## Tipos de Validação Disponíveis

### Texto
- Comprimento mínimo/máximo
- Regex patterns
- Caracteres permitidos

### Email
- Formato válido
- Domínio válido

### CPF
- Formato brasileiro
- Dígitos verificadores
- Validação matemática

### Telefone
- Formato brasileiro
- DDD válido
- Comprimento correto

### Data
- Idade mínima (18 anos)
- Data futura/passada
- Formato válido

### Números
- Valor mínimo/máximo
- Números inteiros/decimais
- Formatação monetária

## Boas Práticas

1. **Sempre valide no submit** - Não confie apenas na validação do cliente
2. **Use mensagens claras** - Erros devem ser específicos e úteis
3. **Formate automaticamente** - Use as funções de formatação para melhor UX
4. **Valide em tempo real** - Use `validateOnChange` para feedback imediato
5. **Mantenha consistência** - Use o mesmo padrão de validação em toda a aplicação
6. **Diferencie erros** - "Campo obrigatório" vs "Valor inválido"
7. **Valide no blur** - Campos são validados quando o usuário sai do campo 