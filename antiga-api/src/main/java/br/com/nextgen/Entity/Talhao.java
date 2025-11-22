package br.com.nextgen.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.SQLDelete;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Talhao")
@SQLDelete(sql = "UPDATE Talhao SET ativo = false WHERE id = ?")
public class Talhao {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "O nome do talhão é obrigatório")
    @Size(min = 2, max = 100, message = "O nome do talhão deve ter entre 2 e 100 caracteres")
    @Column(nullable = false)
    private String nome;

    @Size(max = 500, message = "A descrição não pode exceder 500 caracteres")
    private String descricao;

    @NotNull(message = "O tamanho é obrigatório")
    @Column(nullable = false)
    private Double tamanho;

    @NotNull(message = "O usuário responsável é obrigatório")
    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @NotNull(message = "A medida é obrigatória")
    @Enumerated(EnumType.STRING)
    @Column(name = "medida", nullable = false)
    private Medida medida;

    @ManyToMany
    @JoinTable(
            name = "Talhao_Cultura",
            joinColumns = @JoinColumn(name = "id_talhao"),
            inverseJoinColumns = @JoinColumn(name = "id_cultura")
    )
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Cultura> culturas;

    @ManyToMany
    @JoinTable(
            name = "Talhao_Operacao",
            joinColumns = @JoinColumn(name = "id_talhao"),
            inverseJoinColumns = @JoinColumn(name = "id_operacao")
    )
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Operacao> operacoes;

    @ManyToMany
    @JoinTable(
            name = "Talhao_Colaborador",
            joinColumns = @JoinColumn(name = "id_talhao"),
            inverseJoinColumns = @JoinColumn(name = "id_colaborador")
    )
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Colaborador> colaboradores;

    @Column(nullable = false)
    private Boolean ativo = true;
}
