package br.com.nextgen.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Operacao")
public class Operacao {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "A descrição da operação é obrigatória")
    @Size(min = 3, max = 150, message = "A descrição da operação deve ter entre 3 e 150 caracteres")
    @Column(nullable = false)
    private String operacao;

    @NotBlank(message = "O agente é obrigatório")
    @Size(min = 2, max = 100, message = "O nome do agente deve ter entre 2 e 100 caracteres")
    @Column(nullable = false)
    private String agente;

    @NotNull(message = "A data e hora são obrigatórias")
    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;

    @ManyToMany(mappedBy = "operacoes")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Talhao> talhoes;
}
